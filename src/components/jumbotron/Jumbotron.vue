<template>
    <section>
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class="mb-6 text-5xl md:text-6xl lg:text-7xl font-semibold font-display tracking-tight leading-none text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked
                by Market
            </h1>
            <p class="mb-8 text-base font-normal md:text-lg lg:text-xl sm:px-40 lg:px-80 text-gray-400">All coins
                listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more. We have
                it all.
            </p>
            <dl class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-10">
                <div class="flex flex-col-reverse">
                    <dt class="text-base leading-7 text-gray-300">Market Cap 
                        <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span>Solutions</span>
        <ChevronDownIcon
          :class="open ? '' : 'text-opacity-70'"
          class="ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
              <a
                v-for="item in solutions"
                :key="item.name"
                :href="item.href"
                class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                >
                  <div v-html="item.icon"></div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.description }}
                  </p>
                </div>
              </a>
            </div>
            <div class="bg-gray-50 p-4">
              <a
                href="##"
                class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <span class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">
                    Documentation
                  </span>
                </span>
                <span class="block text-sm text-gray-500">
                  Start integrating products and tools
                </span>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
                    </dt>
                    <dd class="text-base font-bold leading-9 tracking-tight text-white">$ 1.06 Trillion </dd>
                </div>
                <div class="flex flex-col-reverse">
                    <dt class="text-base leading-7 text-gray-300">Trading Volume</dt>
                    <dd class="text-base font-bold leading-9 tracking-tight text-white">$ 43.09 Billion</dd>
                </div>
                <div class="flex flex-col-reverse">
                    <dt class="text-base leading-7 text-gray-300">All Coins</dt>
                    <dd class="text-base font-bold leading-9 tracking-tight text-white">29307</dd>
                </div>
            </dl>
        </div>
    </section>
</template>