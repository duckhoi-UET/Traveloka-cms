<template>
    <a-pagination
        v-if="pagination && pagination.length"
        v-model.number="pagination.page"
        class="ct-pagination"
        :total="pagination.recordsTotal"
        :page-size="pagination.length"
        show-less-items
        @change="handleChangePage"
    />
</template>

<script>
    import _assign from 'lodash/assign';
    import _clondeDeep from 'lodash/cloneDeep';
    import _omit from 'lodash/omit';

    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
            queryParam: {
                type: String,
                default: 'start',
            },
        },

        data() {
            return {
                pagination: _clondeDeep({
                    ...this.data,
                    page: parseInt(this.data?.start, 10) + 1,
                }),
            };
        },

        watch: {
            data(value) {
                this.pagination = _clondeDeep({
                    ...value,
                    page: parseInt(value.start, 10) + 1,
                });
            },
        },

        methods: {
            handleChangePage(page) {
                this.$router.push(this.to(page));
            },

            to(page) {
                const path = this.$route.path;

                const otherParams = _omit(this.$route.query, [this.queryParam]);
                const query = page !== 1
                    ? _assign({}, otherParams, { [this.queryParam]: page - 1 })
                    : otherParams;

                return { path, query };
            },
        },
    };
</script>

<style lang="scss">
.ant-pagination-item {
    &-link {
        i {
            top: -3px;
            @apply relative;
        }
    }
    &-active {
        a {
            color: white !important;
        }
    }
}
</style>
