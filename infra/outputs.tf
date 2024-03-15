output "base_domain" {
  description = "Base domain for whole organization"
  value       = local.base_domain
}

output "github_ci_access_key" {
  description = "Access key for GitHub CI"
  sensitive = true
  value = {
    id = aws_iam_access_key.github_ci.id
    secret = aws_iam_access_key.github_ci.secret
  }
}

output "neon_project" {
  description = "Neon project access data"
  sensitive   = true
  value       = {
    region_id   = neon_project.main.region_id
    platform_id = neon_project.main.platform_id
    project_id  = neon_project.main.id
    branch_id   = neon_project.main.branch.id
    endpoint_id = neon_project.main.branch.endpoint.id
    host        = neon_project.main.branch.endpoint.host
    host_pool   = replace(neon_project.main.branch.endpoint.host, neon_project.main.branch.endpoint.id, "${neon_project.main.branch.endpoint.id}-pooler")
    username    = neon_role.root.name
    password    = neon_role.root.password
  }
}

output "cloudflare_account_id" {
  value = cloudflare_account.default.id
}
output "cloudflare_zone_id" {
  value = cloudflare_zone.base.id
}
