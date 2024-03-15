resource "cloudflare_record" "deno_domain_a" {
  zone_id = local.cloudflare_zone_id
  name    = local.app_subdomain
  type    = "A"
  value   = "34.120.54.55"
  proxied = false
  ttl     = 300
}

resource "cloudflare_record" "deno_domain_aaaa" {
  zone_id = local.cloudflare_zone_id
  name    = local.app_subdomain
  type    = "AAAA"
  value   = "2600:1901:0:6d85::"
  proxied = false
  ttl     = 300
}

resource "cloudflare_record" "deno_domain_cname" {
  zone_id = local.cloudflare_zone_id
  name    = "_acme-challenge.${local.app_subdomain}"
  type    = "CNAME"
  value   = "8fa24dd41d9d602b25570f0e._acme.deno.dev."
  proxied = false
  ttl     = 300
}
