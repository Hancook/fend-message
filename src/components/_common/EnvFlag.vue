<template>
  <transition name="fade">
    <div class="env-flag" :title="profileName">
      {{profileName}}
    </div>
  </transition>

</template>

<script>
  import { ENV_PROD_CONFIG } from '../../utils/env_prod_config'
  import { IS_ENV_DEV } from '../../utils/constants'

  export default {
    name: 'EnvFlag',
    data(){
      Object.assign(this, {
        profileName: IS_ENV_DEV ? '开发版' : ((ENV_PROD_CONFIG.name || '--') + ' ' + ENV_PROD_CONFIG.version)
      })
      return {}
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .env-flag {
    background: #ea0d0d;
    min-width: 3em;
    text-align: center;
    display: inline-block;
    color: #fff;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    position: relative;
    $height: 18px;
    font-size: 12px;
    $padding_v: 1px;
    height: $height;
    line-height: $height;
    padding: $padding_v 4px;
    $size: $height+$padding_v*2;
    margin-left: $size/2;
    &:after {
      $borderSize: $size/2;
      position: absolute;
      left: -$borderSize;
      top: 0;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-right: none;
      border-top: $borderSize solid transparent;
      border-bottom: $borderSize solid transparent;
      border-right: $borderSize solid #ea0d0d;
    }
  }
</style>
