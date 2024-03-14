resource "aws_iam_user" "github_ci" {
  name = "github-ci"
}

resource "aws_iam_access_key" "github_ci" {
  user = aws_iam_user.github_ci.name
}

resource "aws_iam_user_policy" "github_ci" {
  name = "AdminAccessGitHubCI"
  user = aws_iam_user.github_ci.name
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = "*",
        Resource = "*"
      }
    ]
  })
}
