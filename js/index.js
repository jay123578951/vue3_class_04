import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      path: 'jay0303597',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(e) {
      e.preventDefault();

      axios.post(`${this.url}/admin/signin`, this.user)
        .then((res) => {
          if (res.data.success) {
            const token = res.data.token;
            const expired = res.data.expired;
            // 儲存 token 在 coolie
            document.cookie = `hexToken = ${token}; expires=${new Date(expired)}`;
            // 跳轉頁面
            window.location = 'products.html';
          } else {
            alert('請輸入正確的帳號或密碼');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
});

app.mount('#app');
