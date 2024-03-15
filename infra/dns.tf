locals {
  old_base_domain = "orlov-vo.ru"
  github_pages_ipv4_addresses = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
  ]
  github_pages_ipv6_addresses = [
    "2606:50c0:8000::153",
    "2606:50c0:8001::153",
    "2606:50c0:8002::153",
    "2606:50c0:8003::153",
  ]

  caa_issue_records = [
    # for GitHub Pages
    "letsencrypt.org",
    # for AWS
    "amazon.com",
    "amazontrust.com",
    "awstrust.com",
    "amazonaws.com",
  ]

  caa_issuewild_records = [
    # for GitHub Pages
    "letsencrypt.org",
    # for AWS
    "amazon.com",
    "amazontrust.com",
    "awstrust.com",
    "amazonaws.com",
  ]
}

resource "cloudflare_zone" "base" {
  account_id = cloudflare_account.default.id
  zone       = local.base_domain
}

resource "cloudflare_record" "w7it_com_mx" {
  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "MX"
  ttl      = 3600
  priority = 1
  value    = "smtp.google.com"
}

resource "cloudflare_record" "w7it_com_a" {
  for_each = {
    for value in local.github_pages_ipv4_addresses : value => value
  }

  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "A"
  ttl      = 300
  value    = each.value
}

resource "cloudflare_record" "w7it_com_aaaa" {
  for_each = {
    for value in local.github_pages_ipv6_addresses : value => value
  }

  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "AAAA"
  ttl      = 300
  value    = each.value
}

resource "cloudflare_record" "w7it_com_txt_spf" {
  zone_id = cloudflare_zone.base.id
  name    = "@"
  type    = "TXT"
  ttl     = 300
  value   = "v=spf1 include:icloud.com ~all"
}

resource "cloudflare_record" "w7it_com_txt_google" {
  zone_id = cloudflare_zone.base.id
  name    = "@"
  type    = "TXT"
  ttl     = 300
  value   = "google-site-verification=G3yh9Oc7Y8XQaBuVf3AZgnJ2dQnHA6rtSLfKFMhyWKo"
}

resource "cloudflare_record" "w7it_com_txt_openai" {
  zone_id = cloudflare_zone.base.id
  name    = "@"
  type    = "TXT"
  ttl     = 300
  value   = "openai-domain-verification=dv-Mmd41XJg5FnOIKfh5P9JSXBw"
}

resource "cloudflare_record" "www_w7it_com_cname" {
  zone_id  = cloudflare_zone.base.id
  name     = "www"
  type     = "CNAME"
  ttl      = 300
  value    = local.base_domain
}

resource "cloudflare_record" "dkim_w7it_com_cname" {
  zone_id  = cloudflare_zone.base.id
  name     = "sig1._domainkey.${local.base_domain}"
  type     = "CNAME"
  ttl      = 300
  value    = "sig1.dkim.w7it.com.at.icloudmailadmin.com."
}

resource "cloudflare_record" "w7it_com_caa_issue" {
  for_each = {
    for value in local.caa_issue_records : value => value
  }

  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "CAA"
  ttl      = 300

  data {
    flags = "0"
    tag   = "issue"
    value = each.value
  }
}

resource "cloudflare_record" "w7it_com_caa_issuewild" {
  for_each = {
    for value in local.caa_issuewild_records : value => value
  }

  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "CAA"
  ttl      = 300

  data {
    flags = "0"
    tag   = "issuewild"
    value = each.value
  }
}

resource "cloudflare_zone" "old" {
  account_id = cloudflare_account.default.id
  zone       = local.old_base_domain
}

resource "cloudflare_record" "orlov-vo_ru_mx" {
  zone_id  = cloudflare_zone.old.id
  name     = "@"
  type     = "MX"
  ttl      = 3600
  priority = 10
  value    = "mx.yandex.net"
}

resource "cloudflare_record" "orlov-vo_ru_a" {
  for_each = {
    for value in local.github_pages_ipv4_addresses : value => value
  }

  zone_id  = cloudflare_zone.old.id
  name     = "@"
  type     = "A"
  ttl      = 300
  value    = each.value
}

resource "cloudflare_record" "orlov-vo_ru_aaaa" {
  for_each = {
    for value in local.github_pages_ipv6_addresses : value => value
  }

  zone_id  = cloudflare_zone.old.id
  name     = "@"
  type     = "AAAA"
  ttl      = 300
  value    = each.value
}

resource "cloudflare_record" "orlov-vo_ru_cname" {
  zone_id  = cloudflare_zone.old.id
  name     = "www"
  type     = "CNAME"
  ttl      = 300
  value    = local.old_base_domain
}

resource "cloudflare_record" "orlov-vo_ru_txt_spf" {
  zone_id = cloudflare_zone.old.id
  name    = "@"
  type    = "TXT"
  ttl     = 300
  value   = "v=spf1 redirect=_spf.yandex.net"
}

resource "cloudflare_record" "mail__domainkey_orlov-vo_ru_txt" {
  zone_id = cloudflare_zone.old.id
  name    = "mail._domainkey"
  type    = "TXT"
  ttl     = 300
  value   = "v=DKIM1; k=rsa; t=s; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7J3jR0WgdYOPXmy7sF9V0AOCyJWBVByM0InbSHYwQDC7U9sKy9E/h7P9ykGXY+24povlmMGTALA2H2rPjqq6QjurZLdSkAcHfKn4zDztVvG+pK70xxD0cV5XH++3HYq0a5z04zJRTgRKs41uay2c+QHPG/CvNHtTufLXfWu+OrwIDAQAB"
}
