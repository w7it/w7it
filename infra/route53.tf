resource "aws_route53domains_registered_domain" "w7it_com" {
  domain_name = local.base_domain

  name_server {
    name = cloudflare_zone.base.name_servers[0]
  }
  name_server {
    name = cloudflare_zone.base.name_servers[1]
  }
}

data "aws_route53_zone" "w7it_com" {
  name         = "${local.base_domain}."
  private_zone = false
}
