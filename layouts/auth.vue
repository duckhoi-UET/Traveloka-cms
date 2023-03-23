<template>
    <div class="flex justify-between h-screen">
        <div
            class="w-1/2 hidden md:block !bg-cover !bg-center"
            style="background: url('/images/auth-bg.png')"
        />
        <div class="w-screen md:w-1/2 flex flex-col items-center mx-4 my-4">
            <div class="flex-grow flex flex-col items-center justify-center">
                <img class="w-72" src="/images/logo-3.png">
                <div class="mt-4 mb-12 text-gray-80 text-center">
                    Hệ thống quản lý khách sạn trên nền tảng điện toán đám mây
                </div>
                <nuxt class="w-full" />
            </div>
            <div class="text-gray-80 text-center flex justify-center items-center flex-wrap space-x-2">
                <div>Copyright &copy; 2022</div>
                <div>Produced by VNLink IT group</div>
            </div>
        </div>
    </div>
</template>
