import {computed, ref} from "vue";

export default function useSortedAndSearchedPosts(sortesPosts) {
    const searchQuery = ref('');
    const sortedAndSearchedPosts = computed(() => {
        return sortesPosts.value.filter(post => post.title?.toLowerCase().includes(searchQuery.value?.toLowerCase()));
    });

    return {
        sortedAndSearchedPosts, searchQuery
    }
}
