import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './components/pagination.js';
import productModal from './components/productModal.js';
import delProductModal from './components/delProductModal.js';

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'jay0303597';

const app = createApp({
  data() {
    return {
      isNew: false,
      products: [],
      tempProduct: {
        // imagesUrl: []
      },
      pagination: {}
    }
  },
  components: {
    pagination,
    productModal,
    delProductModal,
  },
  created() {
    // 取得 cookie 的 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 把 token 加入 headers
    axios.defaults.headers.common['Authorization'] = token;
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      axios.get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    openModal(isNew, product) {
      if (isNew === 'new') {
        this.tempProduct = {
          // imagesUrl: []
        };
        this.isNew = true;
        this.$refs.updateProductModal.openModal();
      } else if (isNew === 'edit') {
        this.tempProduct = {...product};
        this.isNew = false;
        this.$refs.updateProductModal.openModal();
      } else if (isNew === 'delete') {
        this.tempProduct = {...product};
        this.$refs.deleteProductModal.openModal();
      }
    },
    updateProduct(tempProduct) {
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let method = 'post';

      if (!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, {data: tempProduct})
        .then((res) => {
          if (res.data.success) {
            alert('成功上傳資料');
            this.getProducts();
            this.$refs.updateProductModal.hideModal();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteProduct(tempProduct) {
      axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${tempProduct.id}`)
        .then((res) => {
          if (res.data.success) {
            alert('成功刪除資料');
            this.getProducts();
            this.$refs.deleteProductModal.hideModal();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
});

app.mount('#app');
