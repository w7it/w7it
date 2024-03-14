resource "aws_route53_record" "w7it_com_a" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = local.base_domain
  type    = "A"
  ttl     = "300"

  # GitHub Pages
  records = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
  ]
}

resource "aws_route53_record" "w7it_com_aaaa" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = local.base_domain
  type    = "AAAA"
  ttl     = "300"

  # GitHub Pages
  records = [
    "2606:50c0:8000::153",
    "2606:50c0:8001::153",
    "2606:50c0:8002::153",
    "2606:50c0:8003::153",
  ]
}

resource "aws_route53_record" "w7it_com_mx" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = local.base_domain
  type    = "MX"
  ttl     = "300"

  # GMail
  records = [
    "1 smtp.google.com.",
  ]
}

resource "aws_route53_record" "w7it_com_txt" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = local.base_domain
  type    = "TXT"
  ttl     = "300"

  records = [
    "v=spf1 include:icloud.com ~all",
    "google-site-verification=G3yh9Oc7Y8XQaBuVf3AZgnJ2dQnHA6rtSLfKFMhyWKo",
    "openai-domain-verification=dv-Mmd41XJg5FnOIKfh5P9JSXBw",
  ]
}

resource "aws_route53_record" "www_w7it_com_cname" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = "www.${local.base_domain}"
  type    = "CNAME"
  ttl     = "300"

  # GitHub Pages
  records = [
    "w7it.github.io."
  ]
}

resource "aws_route53_record" "dkim_w7it_com_cname" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = "sig1._domainkey.${local.base_domain}"
  type    = "CNAME"
  ttl     = "300"

  records = [
    "sig1.dkim.w7it.com.at.icloudmailadmin.com."
  ]
}

resource "aws_route53_record" "w7it_com_caa" {
  zone_id = data.aws_route53_zone.w7it_com.id
  name    = local.base_domain
  type    = "CAA"
  ttl     = "300"

  records = [
    # for GitHub Pages
    "0 issue \"letsencrypt.org\"",
    "0 issuewild \"letsencrypt.org\"",

    # for AWS
    "0 issue \"amazon.com\"",
    "0 issue \"amazontrust.com\"",
    "0 issue \"awstrust.com\"",
    "0 issue \"amazonaws.com\"",
    "0 issuewild \"amazon.com\"",
    "0 issuewild \"amazontrust.com\"",
    "0 issuewild \"awstrust.com\"",
    "0 issuewild \"amazonaws.com\"",
  ]
}
