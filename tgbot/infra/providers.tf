provider "aws" {
  region = "us-east-2"
}

provider "neon" {}

provider "cloudflare" {}

provider "deno" {
  organization_id = "328caff9-1eda-470b-931d-1f584e1f33b3"
}
