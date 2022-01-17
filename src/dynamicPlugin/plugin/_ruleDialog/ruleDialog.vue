<template>
  <transition name="rule-wrapper">
    <div class="rule-wrapper">
      <div class="mask" @click="closeRule"></div>
      <div class="container">
        <div class="pop-content">
          <div class="rule-container">
            <div
              class="rule"
              v-for="rule in data"
              :key="rule.title"
              :class="{ individual: !rule.title }"
            >
              <div class="rule-title">{{ rule.title }}</div>
              <div
                class="rule-content"
                v-for="(content, i) in rule.content"
                :key="i"
              >
                <div class="dot"></div>
                <div class="content">{{ content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-close" @click="closeRule"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  created() {
    document.documentElement.classList.add('lock')
    document.body.classList.add('lock')
  },
}
</script>

<style lang="scss" scoped>
.rule-wrapper-enter {
  opacity: 0;
}

.rule-wrapper-enter-to {
  opacity: 1;
}

.rule-wrapper-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.rule-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .mask {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .container {
    z-index: 10;
    .pop-content {
      padding: 75px 20px 25px;
      box-sizing: border-box;
      width: 332px;
      height: 364px;
      position: relative;
      background: url('https://conan-online.fbcontent.cn/conan-oss-resource/zebra16106074260281926.png')
        no-repeat;
      background-size: contain;
      .rule-container {
        height: 100%;
        overflow-y: scroll;
        .rule {
          .rule-title {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ff654f;
            margin: 10px 0 8px 0;
            height: 21px;
            padding-left: 4px;
          }
          .rule-content {
            display: flex;
            margin-bottom: 8px;
          }
          .dot {
            width: 4px;
            height: 4px;
            flex-shrink: 0;
            border-radius: 100px;
            background-color: #fe674c;
            margin: 9px 7px 0 0;
          }
          .content {
            flex: 1;
            font-size: 14px;
            color: #666666;
            line-height: 21px;
            text-align: left;
            letter-spacing: 0;
          }
          &.individual {
            margin-bottom: 14px;
            .rule-title .dot {
              display: none;
            }
            .content {
              padding-left: 5px;
            }
          }
        }
      }
    }
    .btn-close {
      margin: 35px auto 0;
      width: 37px;
      height: 37px;
      background: url('https://conan-online.fbcontent.cn/conan-oss-resource/zebra15823701410383502.png')
        no-repeat;
      background-size: contain;
    }
  }
}
</style>
