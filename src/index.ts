import { Context, Schema, Time } from 'koishi'
import { resolve } from 'path'
import { Client } from '@koishijs/plugin-console'

export const name = 'leak-alert'

export interface Config {
  useYellowWebsiteLiked: boolean 
}

export const Config: Schema<Config> = Schema.object({
  useYellowWebsiteLiked: Schema.boolean().default(false).description("使用如同黄色网站般的提示"),
})

export async function apply(ctx: Context) {
  if (!ctx.inject) { ctx.inject = ctx.using }
  ctx.inject(['console'], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  })

  const isAuthEnabled = () => {
    try {
      const { default: auth } = require('@koishijs/plugin-auth')
      return ctx.registry.has(auth)
    } catch {
      return false
    }
  }

  const dispose = ctx.setInterval(async () => {
    if (isAuthEnabled()) {
      dispose()
      ctx.scope.dispose()
    }
  }, Time.minute)
}
