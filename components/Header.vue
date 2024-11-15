<template>
  <div class="w-full">
    <header class="flex h-20 items-center justify-between px-10 py-3">
      <div class="flex items-center gap-2 font-Sans">
        <Icon name="mdi:heart-multiple" size="32" class="text-red-500" />
        <span class="text-3xl font-bold leading-none text-white">LoveSpot</span>
      </div>

      <SignedOut>
        <div class="flex items-center gap-2">
          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            severity="secondary"
            @click="emit('login')"
          />

          <Button label="Registre-se" @click="emit('register')" />
        </div>
      </SignedOut>

      <SignedIn>
        <div class="flex items-center gap-2">
          <Button
            label="Ver meus sites"
            icon="pi pi-desktop"
            @click="emit('my-generations')"
          />

          <Button label="Criar site" icon="pi pi-plus" @click="emit('new')" />

          <UserButton :show-name="true" />
        </div>
      </SignedIn>
    </header>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "login"): void;
  (e: "register"): void;
  (e: "my-generations"): void;
  (e: "new"): void;
}>();
</script>
