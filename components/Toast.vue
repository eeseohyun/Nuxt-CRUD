<template>
  <UNotification
    description="{{toast.message}}"
    :id="2"
    :timeout="0"
    title="Notification"
  />
</template>

<script setup>
const toast = useToast();
</script>

<style></style>
