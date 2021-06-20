<template>
  <div>
  <svg width="960" height="2000"></svg>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import Search from "@/components/Search"
export default {
  name: 'archive',
  components: {
    Search,
    Nav
  },
  head() {
    return {
      title: "continuum archive",
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "/js/required.min.js";
    document.body.appendChild(script);
  }
}
</script>

<style>
.node circle {
  fill: #999;
}

.node text {
  font: 10px sans-serif;
}

.node--internal circle {
  fill: #555;
}

.node--internal text {
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
}
</style>
