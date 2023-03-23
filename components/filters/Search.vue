<template>
    <div>
        <div v-if="label" class="text-gray-80">
            {{ label }}
        </div>
        <a-input
            v-model="keySearch"
            :placeholder="placeholder"
            class="search-filter"
            :size="size"
            :allow-clear="clearable"
            @keyup.native.enter="onSearch"
            @change="onChange"
        />
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import _map from 'lodash/map';
    import _omit from 'lodash/omit';

    export default {
        props: {
            label: String,
            value: String,
            icon: String,
            placeholder: {
                type: String,
                default: 'Tìm kiếm',
            },
            size: {
                type: String,
                default: 'default',
            },
            query: {
                type: String,
                default: 'freeWord',
            },
            clearable: {
                type: Boolean,
                default: true,
            },
        },

        data() {
            return {
                keySearch: this.$route.query[this.query] || this.value,
            };
        },

        watch: {
            '$route.query': {
                handler(query) {
                    this.keySearch = query[this.query];
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            onSearch() {
                if (this.query && this.keySearch) {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, _map(this.options, 'value')), {
                            [this.query]: this.keySearch,
                            start: 0,
                        }),
                    });
                }

                if (!this.keySearch) {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, [this.query])),
                    });
                }
            },

            onChange() {
                if (!this.keySearch) {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, [this.query])),
                    });
                }
            },
        },
    };
</script>
