resource "neon_project" "main" {
  name       = "w7it"
  region_id  = "aws-us-east-2"
  pg_version = 16

  lifecycle {
    ignore_changes = [ branch ]
  }
}

resource "neon_role" "root" {
  name       = "root"
  branch_id  = neon_project.main.branch.id
  project_id = neon_project.main.id
}
