<template>
  <v-container fluid class="fill-height pa-0" style="background-color: #FAFAFA;">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="5" lg="4" xl="3">
        <!-- Logo y Título -->
        <div class="text-center mb-8">
          <div class="mb-4">
            <v-icon size="48" color="black">mdi-water-outline</v-icon>
          </div>
          <h1 class="text-h4 font-weight-bold mb-2">FlowNet</h1>
          <p class="text-body-2 text-grey-darken-1">Inicia sesión en tu cuenta</p>
        </div>

        <!-- Card de Login -->
        <v-card
          elevation="0"
          border
          rounded="lg"
          class="pa-8"
        >
          <v-form ref="loginForm" v-model="valid" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium mb-2 d-block text-grey-darken-2">
                Correo electrónico
              </label>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                placeholder="tu@email.com"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                required
                :disabled="loading"
              ></v-text-field>
            </div>

            <!-- Password -->
            <div class="mb-2">
              <label class="text-body-2 font-weight-medium mb-2 d-block text-grey-darken-2">
                Contraseña
              </label>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                required
                :disabled="loading"
              ></v-text-field>
            </div>

            <!-- Error Alert -->
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-4 mb-4"
              closable
              @click:close="errorMessage = ''"
            >
              {{ errorMessage }}
            </v-alert>

            <!-- Forgot password -->
            <div class="text-right mb-6 mt-2">
              <a href="#" class="text-decoration-none text-grey-darken-2 text-body-2">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Login Button -->
            <v-btn
              type="submit"
              block
              size="large"
              color="black"
              class="text-none font-weight-medium"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Iniciar sesión
            </v-btn>
          </v-form>
        </v-card>

        <!-- Footer -->
        <div class="text-center mt-6">
          <p class="text-body-2 text-grey-darken-1">
            ¿No tienes una cuenta?
            <a href="#" class="text-decoration-none text-black font-weight-medium">
              Regístrate
            </a>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const valid = ref(false);
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');
    const loginForm = ref(null);

    const emailRules = [
      (v: string) => !!v || 'El correo electrónico es requerido',
      (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
    ];

    const passwordRules = [
      (v: string) => !!v || 'La contraseña es requerida',
      (v: string) => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
    ];

    const handleLogin = async () => {
      if (!valid.value) return;

      loading.value = true;
      errorMessage.value = '';

      try {
        await store.dispatch('auth/login', {
          email: email.value,
          pwd: password.value,
        });

        // Redirigir al dashboard después del login exitoso
        router.push('/');
      } catch (error: any) {
        errorMessage.value = error.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      } finally {
        loading.value = false;
      }
    };

    return {
      valid,
      email,
      password,
      showPassword,
      loading,
      errorMessage,
      loginForm,
      emailRules,
      passwordRules,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>

