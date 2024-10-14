<template>
  <div
    class="flex flex-col justify-center items-center w-full h-screen bg-gray-100"
  >
    <Card style="width: 40rem">
      <template #title> {{ $t('pages.login.title') }}</template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2 login-inputs">
            <label for="username"> {{ $t('pages.login.username') }}</label>
            <InputText
              id="username"
              v-model="username"
              data-test="usernameInput"
              aria-describedby="username-help"
              v-bind="usernameAttrs"
              :placeholder="$t('pages.login.username')"
              :class="{ 'p-invalid': errors?.username }"
            />
            <small
              v-if="errors?.username"
              id="username-help"
              class="error-message"
              >{{ errors?.username }}</small
            >

            <label for="password"> {{ $t('pages.login.password') }}</label>
            <InputText
              id="password"
              v-model="password"
              data-test="passwordInput"
              type="password"
              aria-describedby="password-help"
              v-bind="passwordAttrs"
              :placeholder="$t('pages.login.password')"
              :class="{ 'p-invalid': errors?.password }"
            />
            <small
              v-if="errors?.password"
              id="password-help"
              class="error-message"
              >{{ errors?.password }}</small
            >
          </div>
          <div class="flex justify-end mt-4">
            <PrimeButton type="submit" :label="$t('pages.login.submit')" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style src="./index.css" scoped></style>
