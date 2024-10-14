import { defineComponent, ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { useAuthStore } from '@/stores/auth'
import { createValidationSchema } from '@/modules/auth/validations/login-scheme'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useLogin } from '@/modules/auth/composables/use-login'

export default defineComponent({
  components: {
    Card,
    InputText,
  },
  setup() {
    useTitle('Login To Apps')
    const { t } = useI18n()
    const authStore = useAuthStore()
    const router = useRouter()

    // setup form
    const validationSchema = createValidationSchema(t)
    const { values, errors, validate, defineField } = useForm<
      yup.InferType<typeof validationSchema>
    >({
      validationSchema,
    })

    // setup ref
    const [username, usernameAttrs] = defineField('username')
    const [password, passwordAttrs] = defineField('password')
    const isLoading = ref(false)

    const onSubmit = async () => {
      const validationResult = await validate()
      if (validationResult.valid) {
        isLoading.value = true
        const data = await useLogin(values.username, values.password)
        if (data) {
          authStore.setUserDate(data)
        }
        router.push('/home')
        isLoading.value = false
      }
    }

    return {
      // state
      username,
      usernameAttrs,
      password,
      passwordAttrs,
      isLoading,
      errors,

      // action
      onSubmit,
    }
  },
})
