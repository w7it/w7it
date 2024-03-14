data "aws_route53_zone" "w7it_com" {
  name         = "${local.base_domain}."
  private_zone = false
}
