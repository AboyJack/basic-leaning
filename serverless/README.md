#### 1. Serverless是什么？
- 无服务器架构几乎封装了所有底层资源管理和系统运维工作
- 服务器部署、扩缩容、运维、监控报警交由云服务厂商来做
- 前端开发只关注业务，不需要关注服务器

1.2 云函数
- [函数服务](https://console.cloud.tencent.com/scf/list-create?rid=1&ns=default)

#### 2. serverless framework
- Serverless Framework 是业界非常受欢迎的无服务器应用框架，开发者无需关心底层资源即可部署完整可用的Serverless应用架构
- Serverless Framework 具有资源编排、自动伸缩、事件驱动等能力，覆盖编码、调试、测试、部署等全生命周期，帮助开发者通过联动云资源，迅速构建Serverless

#### 3. Serverless Components
- Serverless Components 是支持多个云资源编排和组织的场景化解决方案，主要基于客户的具体场景，如Express框架支持、网站部署等
- Serverless Components 可以有效简化云资源的配置和管理，将网关、COS和CAM等产品联动起来，让客户更多关注场景和业务
- Serverless Framework Components 最佳实践
  - @serverless/tencent-scf - 腾讯云云函数组件
  - @serverless/tencent-express - 快速部署基于Express.js的后端服务到腾讯云函数的组件
  - @serverless/tencent-website - 快速部署静态网站到腾讯云组件