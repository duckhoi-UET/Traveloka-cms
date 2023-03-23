<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 items-end">
        <SearchFilter query="billId" label="Mã xác nhận" placeholder="Mã xác nhận" />
        <SearchFilter query="billNo" label="Số hóa đơn" placeholder="Số hóa đơn" />
        <SearchFilter query="roomId" label="Số phòng" placeholder="Số phòng" />
        <SelectRemoteFilter
            query="serviceId"
            router
            label="Dịch vụ"
            fetch-url="selections/fetchServices"
            option-label="name"
            option-value="id"
            store="selections"
            store-prop="services"
            placeholder="Dịch vụ"
        />
        <SelectRemoteFilter
            query="itemId"
            router
            label="Item"
            fetch-url="items/fetchAll"
            option-label="name"
            option-value="id"
            store="items"
            store-prop="items"
            placeholder="Item"
        />
        <SelectFilter
            query="status"
            label="Trạng thái"
            placeholder="Trạng thái"
            :options="BILL_STATUS_OPTIONS"
        />
        <DateRangeFilter
            label="Ngày tạo"
            query="created"
            :allow-clear="false"
        />
        <div class="sm:col-span-2 lg:col-span-4 2xl:col-span-3 grid grid-cols-2 lg:flex justify-end gap-4">
            <a-button @click="empty">
                Nhập lại
            </a-button>
            <a-button type="primary">
                Tìm kiếm
            </a-button>
            <a-button type="primary" ghost>
                <i class="far fa-file-excel mr-2" /> Xuất dữ liệu
            </a-button>
            <a-button type="primary" ghost>
                <i class="fas fa-print mr-2" /> In danh sách
            </a-button>
        </div>
    </div>
</template>

<script>
    import DateRangeFilter from '@/components/filters/DateRange.vue';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';
    import SelectRemoteFilter from '@/components/filters/SelectRemote.vue';

    export default {
        components: {
            DateRangeFilter,
            SearchFilter,
            SelectFilter,
            SelectRemoteFilter,
        },
    };
</script>
