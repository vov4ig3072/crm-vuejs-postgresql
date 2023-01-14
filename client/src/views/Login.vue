<template>
    <div class="form-auth deep-purple lighten-5">
        <h5>HOME CRM</h5>
        <form @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    class="validate"
                    v-model.trim="email"
                    :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"
                />
                <label for="email">Email </label>

                <span
                    class="invalid-message"
                    v-if="v$.email.$dirty && v$.email.required.$invalid"
                    >{{ messageRequired }}</span
                >
                <span
                    class="invalid-message"
                    v-else-if="v$.email.$dirty && v$.email.$invalid"
                    >{{ this.v$.email.email.$message }}</span
                >
            </div>
            <div class="input-field">
              <input
                  id="2"
                  type="password"
                  class="validate"
                  v-model.trim="password"
                  :class="{ invalid: v$.password.$dirty && v$.password.$invalid }"
              />
              <label for="last_name">Password</label>

              <span
                  class="invalid-message"
                  v-if="v$.password.$dirty && v$.password.required.$invalid"
                  >{{ messageRequired }}</span
              >
              <span
                  class="invalid-message"
                  v-else-if="v$.password.$dirty && v$.password.$invalid"
                  >{{ this.v$.password.minLength.$message }}</span
              >
            </div>
            <button class="btn deep-purple lighten-1" type="submit">
                Sing in
                <i class="material-icons right">send</i>
            </button>
        </form>

        <p class="reg-paragraph">
          No account? &nbsp;<router-link to="/registration"
            >Registration</router-link
          >
        </p>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import messages from "../utils/messages";

export default {
    name: "login",
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        email: "",
        password: "",
        messageRequired: "Поле обов'язкове до заповнення",
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message]);
        }
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch();
                return;
            }

            const formData = {
                email: this.email,
                password: this.password,
            };

            const requestOptions = {
                method: "POST",
                body: JSON.stringify({ ...formData }),
                headers: {
                  "Content-Type": "application/json",
                },
            };

            await fetch("/api/user/login", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if ("error" in data) {
                        this.$error(data["error"]);
                    } else {
                        this.$cookies.set("token", data.token);
                        this.$cookies.set("userId", data.userId);

                        this.$router.push("/");
                    }
                })
                .catch((e) => console.log(e));
          },
    },
};
</script>
