resource "deno_project" "main" {
  name = local.appname
}

data "deno_assets" "assets" {
  path    = ".."
  pattern = "src/**/*.{ts,json}"
}

data "deno_assets" "config" {
  path    = "../.."
  pattern = "deno.{json,jsonc,lock}"
}

resource "deno_deployment" "main" {
  project_id = deno_project.main.id
  assets     = merge(data.deno_assets.assets.output, data.deno_assets.config.output)

  entry_point_url = "src/main.ts"

  env_vars = {
    for name, secret in local.secrets : name => secret.secret_value
  }
}
