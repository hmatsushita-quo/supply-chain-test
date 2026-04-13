# Supply Chain Vulnerability Sample Project

サプライチェーン攻撃検出サービスの挙動検証用サンプルプロジェクトです。
**本番環境では絶対に使用しないでください。**

## セットアップ

```bash
yarn install
yarn start       # サーバー起動 (port 3000)
yarn audit       # 脆弱性一覧を確認
```

## 含まれる脆弱性の一覧

### Critical (3件)

| パッケージ | バージョン | 脆弱性 | CVE |
|-----------|-----------|--------|-----|
| axios | 0.21.0 | SSRF / Follow Redirects | CVE-2021-3749 |
| jsonwebtoken | 8.5.1 | Insecure Key Handling | CVE-2022-23529 |
| tar | 6.1.0 | Path Traversal | CVE-2021-37701 |

### High (33件) - 主なもの

| パッケージ | バージョン | 脆弱性 | CVE |
|-----------|-----------|--------|-----|
| lodash | 4.17.20 | Prototype Pollution / Command Injection | CVE-2021-23337 |
| minimist | 1.2.5 | Prototype Pollution | CVE-2021-44906 |
| node-fetch | 2.6.0 | Exposure of Sensitive Information | CVE-2022-0235 |
| shelljs | 0.8.4 | Improper Privilege Management | — |
| marked | 0.3.6 | ReDoS / XSS | CVE-2022-21680 |
| json5 | 2.2.1 | Prototype Pollution | CVE-2022-46175 |

### Moderate (18件) - 主なもの

| パッケージ | バージョン | 脆弱性 | CVE |
|-----------|-----------|--------|-----|
| qs | 6.5.2 | Prototype Pollution | CVE-2022-24999 |
| semver | 5.7.1 | ReDoS | CVE-2022-25883 |
| trim-newlines | 3.0.0 | ReDoS | — |
| glob-parent | 5.1.1 | ReDoS | CVE-2021-35065 |
| nanoid | 3.1.22 | Predictable ID Generation | — |

### Low (8件)

間接依存パッケージ（transitive dependencies）に含まれる低リスクの脆弱性。

## 脆弱性のカテゴリ

本プロジェクトは以下のカテゴリの脆弱性を含んでいます：

1. **Prototype Pollution** - lodash, minimist, qs, json5
2. **SSRF (Server Side Request Forgery)** - axios
3. **XSS (Cross-Site Scripting)** - marked
4. **ReDoS (Regular Expression DoS)** - marked, semver, trim-newlines, glob-parent
5. **Path Traversal** - tar
6. **Improper Privilege Management** - shelljs
7. **Sensitive Information Exposure** - node-fetch
8. **Insecure Cryptographic Operations** - jsonwebtoken
9. **間接依存の脆弱性** - express等の依存ツリーに含まれるもの