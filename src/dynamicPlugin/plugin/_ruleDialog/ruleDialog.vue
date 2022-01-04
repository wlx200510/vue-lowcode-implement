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
