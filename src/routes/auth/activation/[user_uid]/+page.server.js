import user from '$lib/server/models/user.js';

export async function load({params}){
    const is_activation_success = await user.activate({uid: params.user_uid});
    return {is_activation_success};
};