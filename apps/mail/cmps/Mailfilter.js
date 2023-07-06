export default {
    props: ['selectedTab'],
    template: `
      <section class="menu-filter">
        <div class="menu-top">
          <div class="menu-header">
            <i class="fa fa-bars" aria-hidden="true" @click="updateModalStatus"></i>
            <img class="gmail-logo" src="assets/imgs/gmail-logo.png" />
            <p>Gmail</p>
          </div>
          <label class="search">
            <span class="search-icon">
              <i class="fa fa-search" aria-hidden="true"></i>
            </span>
            <input 
              class="search-input" 
              type="search" 
              placeholder="Search mail" 
              :value="searchValue"
              @input="searchMail"
            />
          </label>
        </div>
      </section>
    `,
    data() {
      return {
        searchValue: '',
      }
    },
    methods: {
      updateModalStatus() {
        this.$emit('updateModal')
      },
      searchMail(ev) {
        this.searchValue = ev.target.value;
        this.$emit('filterBySearch', this.searchValue)
      },
    },
    watch: {
      selectedTab: {
        handler() {
          this.searchValue = ''
        },
        deep: true,
      },
    },
  }