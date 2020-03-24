<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <router-link to="/about/a">About/a页面</router-link>|
      <router-link to="/about/b">About/b页面</router-link>
    </div>
    <router-view />
  </div>
</template>
