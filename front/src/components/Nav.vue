.<template>
  <nav>
  
    <ul class="collections">
      <li 
        v-for="collection in collections"
        :key="collection.slug"  
      > 
        <router-link :to="collection.slug">
          {{ collection.name }} 
        </router-link>
      </li>
    </ul>
    
    <ul class="singles">
      <li 
        v-for="single in singles"
        :key="single.slug"  
      > 
        <router-link :to="single.slug">
          {{ single.name }} 
        </router-link>
      </li>
    </ul>
  
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      collections: [
        {
          name: 'resources',
          slug: 'resources'
        },
        {
          name: 'artworks',
          slug: 'artworks'
        },
      ],
      singles: [
        {
          name: 'about',
          slug: 'about'
        },
        {
          name: 'contact',
          slug: 'contact'
        },
      ]
    }
  }
}
</script>

<style>

nav {
  margin: 1em;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  padding: 0;
}

</style>