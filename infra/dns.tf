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

  cloudflare_email_routing_mx = {
    "route1.mx.cloudflare.net" = 55
    "route2.mx.cloudflare.net" = 35
    "route3.mx.cloudflare.net" = 88
  }

  cloudflare_email_routing_mx_old = {
    "route1.mx.cloudflare.net" = 67
    "route2.mx.cloudflare.net" = 41
    "route3.mx.cloudflare.net" = 48
  }
}

resource "cloudflare_zone" "base" {
  account_id = cloudflare_account.default.id
  zone       = local.base_domain
}

resource "cloudflare_record" "w7it_com_mx" {
  for_each = local.cloudflare_email_routing_mx

  zone_id  = cloudflare_zone.base.id
  name     = "@"
  type     = "MX"
  ttl      = 3600
  priority = each.value
  value    = each.key
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
  value   = "v=spf1 include:_spf.mx.cloudflare.net ~all"
}


resource "cloudflare_record" "w7it_com_txt_openai" {
  zone_id = cloudflare_zone.base.id
  name    = "@"
  type    = "TXT"
  ttl     = 300
  value   = "openai-domain-verification=dv-Mmd41XJg5FnOIKfh5P9JSXBw"
}

resource "cloudflare_record" "github_w7it_com_txt" {
  zone_id = cloudflare_zone.base.id
  name    = "_github-pages-challenge-w7it"
  type    = "TXT"
  ttl     = 300
  value   = "f41419fcc9cfb92c5aee9c0ec1be35"
}

resource "cloudflare_record" "www_w7it_com_cname" {
  zone_id  = cloudflare_zone.base.id
  name     = "www"
  type     = "CNAME"
  ttl      = 300
  value    = local.base_domain
}

resource "cloudflare_record" "trader_w7it_com_a" {
  zone_id  = cloudflare_zone.base.id
  name     = "trader"
  type     = "A"
  ttl      = 300
  value    = "188.245.36.128"
}

resource "cloudflare_record" "n8n_w7it_com_a" {
  zone_id  = cloudflare_zone.base.id
  name     = "n8n"
  type     = "A"
  ttl      = 300
  value    = "188.245.36.128"
}

resource "cloudflare_record" "jtbd_w7it_com_a" {
  zone_id  = cloudflare_zone.base.id
  name     = "jtbd"
  type     = "A"
  ttl      = 300
  value    = "188.245.36.128"
}

resource "cloudflare_record" "memory_w7it_com_a" {
  zone_id  = cloudflare_zone.base.id
  name     = "memory"
  type     = "A"
  ttl      = 300
  value    = "188.245.36.128"
}

resource "cloudflare_record" "zergcode_w7it_com_a" {
  zone_id  = cloudflare_zone.base.id
  name     = "zergcode"
  type     = "A"
  ttl      = 300
  value    = "188.245.36.128"
}

resource "cloudflare_record" "dkim_w7it_com_txt" {
  zone_id = cloudflare_zone.base.id
  name    = "cf2024-1._domainkey"
  type    = "TXT"
  ttl     = 300
  value   = "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiweykoi+o48IOGuP7GR3X0MOExCUDY/BCRHoWBnh3rChl7WhdyCxW3jgq1daEjPPqoi7sJvdg5hEQVsgVRQP4DcnQDVjGMbASQtrY4WmB1VebF+RPJB2ECPsEDTpeiI5ZyUAwJaVX7r6bznU67g7LvFq35yIo4sdlmtZGV+i0H4cpYH9+3JJ78km4KXwaf9xUJCWF6nxeD+qG6Fyruw1Qlbds2r85U9dkNDVAS3gioCvELryh1TxKGiVTkg4wqHTyHfWsp7KD3WQHYJn0RyfJJu6YEmL77zonn7p2SRMvTMP3ZEXibnC9gz3nnhR6wcYL8Q7zXypKTMD58bTixDSJwIDAQAB"
}

resource "cloudflare_record" "dmarc_w7it_com_txt" {
  zone_id = cloudflare_zone.base.id
  name    = "_dmarc"
  type    = "TXT"
  ttl     = 300
  value   = "v=DMARC1; p=none; rua=mailto:40a6ff871ec245a78faba3f3e1354cb5@dmarc-reports.cloudflare.net;"
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
  for_each = local.cloudflare_email_routing_mx_old

  zone_id  = cloudflare_zone.old.id
  name     = "@"
  type     = "MX"
  ttl      = 3600
  priority = each.value
  value    = each.key
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
  value   = "v=spf1 include:_spf.mx.cloudflare.net ~all"
}

resource "cloudflare_email_routing_catch_all" "orlov-vo_ru" {
  zone_id = cloudflare_zone.old.id
  name    = "catch-all"
  enabled = true

  matcher {
    type = "all"
  }

  action {
    type  = "forward"
    value = ["vlad.it@icloud.com"]
  }
}

resource "cloudflare_record" "dkim_orlov-vo_ru_txt" {
  zone_id = cloudflare_zone.old.id
  name    = "cf2024-1._domainkey"
  type    = "TXT"
  ttl     = 300
  value   = "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiweykoi+o48IOGuP7GR3X0MOExCUDY/BCRHoWBnh3rChl7WhdyCxW3jgq1daEjPPqoi7sJvdg5hEQVsgVRQP4DcnQDVjGMbASQtrY4WmB1VebF+RPJB2ECPsEDTpeiI5ZyUAwJaVX7r6bznU67g7LvFq35yIo4sdlmtZGV+i0H4cpYH9+3JJ78km4KXwaf9xUJCWF6nxeD+qG6Fyruw1Qlbds2r85U9dkNDVAS3gioCvELryh1TxKGiVTkg4wqHTyHfWsp7KD3WQHYJn0RyfJJu6YEmL77zonn7p2SRMvTMP3ZEXibnC9gz3nnhR6wcYL8Q7zXypKTMD58bTixDSJwIDAQAB"
}
