export default {
  props: ['pages'],
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled': !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous"
          @click="$emit('get-product', pages.current_page -1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        :class="{ 'active': pageNum === pages.current_page }"
        v-for="(pageNum, key) in pages.total_pages" :key="key">
        <a class="page-link" href="#" @click="$emit('get-product', pageNum)">
          {{ pageNum }}
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next"
          @click="$emit('get-product', pages.current_page +1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}
