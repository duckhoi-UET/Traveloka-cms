<template>
  <div class="item-favorite">
    <a-card hoverable>
      <img slot="cover" alt="example" :src="data.image" />
      <div>
        <h4>
          {{ data.title }}
        </h4>
        <div class="flex justify-between">
          <StarRating
            v-model="data.star"
            :show-rating="false"
            :star-size="15"
          ></StarRating>
          <div class="font-semibold text-prim-100">
            <span class="text-lg">{{ data.price }}đ</span>
            <span class="text-red-100 text-xs line-through"
              >{{ data.oldPrice }}đ</span
            >
          </div>
        </div>
        <div class="mt-2">
          <div class="flex items-center gap-2">
            <i class="fas fa-eye text-lg mt-[1px]"></i>
            <span>{{ data.views }}</span>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  components: {
    StarRating,
  },
  data() {
    return {
      rating: 3,
    };
  },
};
</script>

<style lang="scss">
.item-favorite {
  .ant-card-body {
    @apply p-3 #{!important};
  }
}
</style>

