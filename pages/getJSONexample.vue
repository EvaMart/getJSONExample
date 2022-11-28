<template>
	<v-container>
		<h1 class="text-h4">
				Async calls to retrieve JSON files with Nuxt.js
			</h1>
			<p class="mt-4 mb-6">
				The problem with <a>https://raw.githubusercontent.com/sthhher/prueba2/main/myschema.json</a> is that an app cannot access it directly because of CORS policy by GitHub.
				It is a cross-domain request (oeb web domain -> github domain) that GitHub does not allow.
				<br>
			</p>

			<h4 class="text-h5 primary--text m-2">GitHub API (requires TOKEN)</h4>
			<p class="mt-2 mb-2">
				This example calls the GitHub API with a GitHub access token.
				To test this, I created a <a href="https://github.com/EvaMart/myschema-test">repo</a> in my GitHub account,
				added the schema file (`sthhher/prueba2/myschema.json`) and created a token with the "repo" scope.
				It should work the same with any other repo.
			</p>
			<p class="mt-2 mb-2">
				To create a personal access token go to your GitHub account settings
				-> Developer settings -> Personal access tokens -> Generate new token.<br>
				The token is used when making the request
				(see in store/getJSONExample.js/getJSONSchema).
			</p>
			<p class="mt-2 mb-2">
				I use axios to make the request, as it is the deafult module for that purpose in this
				application. You could use $.getJSON method, which I think is a jQuery method,
				but I don't know how to use it in Nuxt.js.

			</p>
			<pre class="text-caption">{{ schema }}</pre>

	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ExmaplePage',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'get-JSON-example',
					disabled: true,
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
	created: async function() {
		await this.$store.dispatch('getJSONExample/getJSONSchema');
	},
	computed: {
		...mapGetters('getJSONExample', {
			schema: 'getSchema',
		}),
	}
}
</script>
