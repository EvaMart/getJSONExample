
import { Octokit } from "@octokit/rest";

export default {
	namespaced: true,
	state: () => {
		return {
			schema: {'msg': 'Hello World!'},
			}
	},
	getters: {
		getSchema: state => state.schema,
	},
	actions: {
		async getJSONSchema({ commit }, params) {
			// URL is v3 github instead of raw.githubusercontent.com because it allows access tokens.
			// api.github work and you can get the same stuff.
			const response = await this.$axios.$get("https://api.github.com/repos/evamart/myschema-test/contents/myschema.json", {
				headers: {
					'Authorization': 'Bearer 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', // Personal access token HERE
					'Accept': 'application/vnd.github+json'
				}
			});
			// the content is in response.content and is base64 encoded,
			// so we need to decode it using atob() function
			// source: https://stackoverflow.com/a/42322709
			console.log(atob(response.content))
			commit('setSchema', atob(response.content))
		},


		// The following function is the same as the previous, but using octokit (by GitHub)
		// octokit is a library that allows to make requests to all GitHub APIs
		// makes requests more readable and easier to use
		// Not necessary to use it, I tried it to see if I could avoid the dencoding step. I could not 😂

		async getJSONSchema2({ commit }, params) {
			const octokit = new Octokit({
				auth: 'Bearer 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'
			});

			const { data } = await octokit.rest.repos.getContent({
				mediaType: {
				  previews: ["raw"],
				  mediaType: "application/vnd.github.v3.raw",
				},
				owner: "evamart",
				repo: "myschema-test",
				path: "myschema.json",
			  });

			console.log(data)

			// the content is base64 encoded, so we need to decode it
			// using atob() function
			// source: https://stackoverflow.com/a/42322709
			console.log(atob(data.content))
			commit('setSchema', atob(data.content))
		}
	},
	mutations: {
		setSchema(state, schema) {
			state.schema = schema
		},

	}
}
