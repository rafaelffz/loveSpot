<template>
  <div class="w-full">
    <header
      :class="[
        'flex h-20 items-center justify-between px-5',
        route.path.includes('/dashboard') ||
        route.path.includes('/generations/new')
          ? 'border-b border-b-slate-300 bg-slate-200'
          : '',
      ]"
    >
      <div
        class="flex cursor-pointer items-center gap-2 font-Sans"
        @click="emit('home')"
      >
        <Icon
          name="mdi:heart-multiple"
          :size="isMobile ? 28 : 32"
          class="text-red-500"
        />
        <span
          class="font-bold leading-none"
          :class="[
            route.path.includes('/dashboard') ||
            route.path.includes('/generations/new')
              ? 'text-black'
              : 'text-white',
            isMobile ? 'text-xl' : 'text-3xl',
          ]"
          >LoveSpot</span
        >
      </div>

      <SignedOut>
        <div class="flex items-center gap-2">
          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            severity="secondary"
            raised
            :size="isMobile ? 'small' : undefined"
            @click="emit('login')"
          />

          <Button
            label="Registre-se"
            raised
            :size="isMobile ? 'small' : undefined"
            @click="emit('register')"
          />
        </div>
      </SignedOut>

      <SignedIn>
        <div class="flex items-center gap-4">
          <Button
            :label="isMobile ? '' : 'Dashboard'"
            severity="secondary"
            icon="pi pi-home"
            raised
            @click="emit('my-generations')"
          />

          <Button
            :label="isMobile ? '' : 'Criar site'"
            icon="pi pi-plus"
            raised
            @click="emit('new')"
          />

          <UserButton />
        </div>
      </SignedIn>
    </header>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
const isMobile = smallerOrEqual("md");

const emit = defineEmits<{
  (e: "home"): void;
  (e: "login"): void;
  (e: "register"): void;
  (e: "my-generations"): void;
  (e: "new"): void;
}>();

const route = useRoute();
</script>
