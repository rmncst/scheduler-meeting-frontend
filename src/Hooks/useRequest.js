import React, {useState} from "react";


export function useRequest(path = null, method = null, body = null) {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const env = require('../env/development');

    function load(_path = null, _body = null) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = `${env.schedulerMeetingApi.server}/${_path ?? path}`;
        setLoading(true);
        return fetch(url,{ method, body: _body ?? body, headers: headers})
            .then(
                async res => {
                    if(res.ok) {
                        const body = await res.json();
                        setContent(body)
                        return Promise.resolve(body);

                    } else {
                        return Promise.reject(res);
                    }
                }
            )
            .finally(() => setLoading(false))
    }

    return {
        load,
        content,
        loading
    }

}