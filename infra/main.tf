terraform {
  backend "s3" {
    bucket = "w7it-infra-tf-states"
    key    = "main.tfstate"
    region = "us-east-1"
  }
}

locals {
  base_domain = "w7it.com"
}
