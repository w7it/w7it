locals {
  secret_names = [
    "TELEGRAM_BOT_TOKEN"
  ]
}

module "secret" {
  for_each = toset(local.secret_names)

  source           = "./modules/secret"
  name             = each.value
  application_name = local.appname
}

locals {
  secrets = {
    for secret in module.secret :
    secret.name => {
      name         = secret.name
      arn          = secret.arn
      secret_value = secret.secret_value
    }
  }
}
