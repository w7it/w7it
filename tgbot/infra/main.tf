terraform {
  backend "s3" {
    bucket = "w7it-infra-tf-states"
    key    = "telegram_w7it_bot.tfstate"
    region = "us-east-1"
  }
}

data "terraform_remote_state" "w7it_main" {
  backend   = "s3"
  workspace = terraform.workspace
  config = {
    bucket = "w7it-infra-tf-states"
    key    = "main.tfstate"
    region = "us-east-1"
  }
}

locals {
  appname       = "w7it-tgbot"
  app_subdomain = terraform.workspace == "production" ? "tgbot" : "tgbot.${terraform.workspace}"
  app_domain    = "${local.app_subdomain}.${local.base_domain}"

  base_domain           = data.terraform_remote_state.w7it_main.outputs.base_domain
  neon_project          = data.terraform_remote_state.w7it_main.outputs.neon_project
  cloudflare_account_id = data.terraform_remote_state.w7it_main.outputs.cloudflare_account_id
  cloudflare_zone_id    = data.terraform_remote_state.w7it_main.outputs.cloudflare_zone_id
}
