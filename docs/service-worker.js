/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","ffd91461003ad5381653ece8a4a7191c"],["/about/index.html","6ed4c43c39a11fc85cd50400f6e75db0"],["/archive/index.html","65e2bb4842b645d02d628a71f55e4cdc"],["/categories/acm/index.html","3c56d7cc3ed9972c59fa1d3e2d869649"],["/categories/acm/page/1/index.html","6f5bbd8caaf1322f06887d7a8c2545e6"],["/categories/acm/page/2/index.html","79b0bd8cd56f3bf9a4d9802008da36a6"],["/categories/acm/page/3/index.html","c40437644e614ba15fabdb9a47e8dca0"],["/categories/asp.net/index.html","1621df38c3fdd44657a470d192e95d5b"],["/categories/asp.net/page/1/index.html","112b947de003f4db432cbd794b830e76"],["/categories/cloud-computing/index.html","10961e0878bed6d0884437eb62b626e8"],["/categories/cloud-computing/page/1/index.html","7ef4c7dda0c2f462b8d4652db17da7d1"],["/categories/gfw/index.html","3871ce20367ec652d4117d6fe995fa81"],["/categories/gfw/page/1/index.html","42ab14bf993e18aca80bfddc4307ea70"],["/categories/hexo/index.html","9d9b8146af9f1fb53334d6857b9a6705"],["/categories/hexo/page/1/index.html","e2b8c3a8e8c65f9c84aa9ae03539e8ab"],["/categories/ide-editor/index.html","0f4415b905e331189236031419f6f38a"],["/categories/ide-editor/page/1/index.html","4e614e5f9fa7dcd03bafd786fffdd979"],["/categories/index.html","c0e9e346cfcb465298c6d2fb586e3846"],["/categories/linux/index.html","54a0dfd460090c6fd6965c5fcda78a2a"],["/categories/linux/page/1/index.html","7fced01a25439d22eecf91766d1c4c0c"],["/categories/openwrt/index.html","1727760a3cd7c5c322a38ee17287898b"],["/categories/openwrt/page/1/index.html","56647a664b0bafe1fc7e07b3ee55cb95"],["/categories/python/index.html","182569cca0675ad8d9e2582a76c3a50d"],["/categories/python/page/1/index.html","0543e8112e0924d6655201a49c8ffadb"],["/categories/tech-daily/index.html","a925e2d3ed43a506ffa32f54a23d3ae3"],["/categories/tech-daily/page/1/index.html","e533a59b3bd8ef55fa56438b9b000524"],["/categories/tool/index.html","db5ee2b84fbd36062d4d6e459ce9411d"],["/categories/tool/page/1/index.html","bb1bca6a4d9941c2da121c7260ca2178"],["/categories/web/index.html","5bcbf0a7246054accbca1b5759eb7483"],["/categories/web/page/1/index.html","952e13b892912b56ceb31b7ceb9de990"],["/categories/web/page/2/index.html","a458d1f4220ee6bcc8be163bc13968e4"],["/categories/wine/index.html","13904824b28e2c30d46dd4e7b6ae413d"],["/categories/wine/page/1/index.html","d141a46a6bd15c88df9549d717f31f62"],["/css/index-38e3c7abf5.css","38e3c7abf5b8b7e0225a00cbcd3b6741"],["/fonts/roboto/Roboto-Bold.woff","eed9aab5449cc9c8430d7d258108f602"],["/fonts/roboto/Roboto-Bold.woff2","c0f1e4a4fdfb8048c72e86aadb2a247d"],["/fonts/roboto/Roboto-Light.woff","ea36cd9a0e9eee97012a67b8a4570d7b"],["/fonts/roboto/Roboto-Light.woff2","3c37aa69cd77e6a53a067170fa8fe2e9"],["/fonts/roboto/Roboto-Medium.woff","cf4d60bc0b1d4b2314085919a00e1724"],["/fonts/roboto/Roboto-Medium.woff2","1561b424aaef2f704bbd89155b3ce514"],["/fonts/roboto/Roboto-Regular.woff","3cf6adf61054c328b1b0ddcd8f9ce24d"],["/fonts/roboto/Roboto-Regular.woff2","5136cbe62a63604402f2fedb97f246f8"],["/fonts/roboto/Roboto-Thin.woff","44b78f142603eb69f593ed4002ed7a4a"],["/fonts/roboto/Roboto-Thin.woff2","1f35e6a11d27d2e10d28946d42332dc5"],["/img/20-0fb41aa685.jpg","0fb41aa68531447b916b3922064cc7a7"],["/img/avatar-66318e716f.png","66318e716f2ca8fb88fe391528b325d2"],["/img/avatar-94a2a41df3.jpg","94a2a41df310fdc3d725163ab83e1c28"],["/img/bg-a989500540.png","a9895005401d4df0e680c19beaf263f6"],["/img/bg-c1cb8d6cae.jpg","c1cb8d6caef328d28ecc3b31d18c75ce"],["/img/iconseamless-1ee81dfd14.png","1ee81dfd14d1602351845dd7df9481f6"],["/img/profile-bg-7c6e6a1672.jpg","7c6e6a1672fb007785587c6591d5d2d8"],["/index.html","77f3c15db84194ce75087fc707201d0a"],["/index.json","01eee371c6cff9f2c0f9a5bd41d73b51"],["/js/Valine.min.js","7be4e16805579774c7b9d11e8f7d67fd"],["/js/av-min.js","7decd7d8ad2ecdad9aa8168ee8485524"],["/js/canvas-a8593a389f.js","a8593a389f8ac7b45f8ca5b7c0e6daac"],["/js/index-e16d25bc2c.js","e16d25bc2cad6eb3cbd8a8f87cb3bee4"],["/js/polyfill-7b0f9ccd98.js","7b0f9ccd98493cdfdbe0b48e27322eb6"],["/page/1/index.html","53d2a7ec76b3676477b1cedd5b070c52"],["/page/2/index.html","fc48c70b9878cb6c1080f8056837da72"],["/page/3/index.html","d6e1d2e43954a18d18010ae4f8a493ae"],["/page/4/index.html","27089840410caebb9108bbead6e0c10e"],["/page/5/index.html","5ad805f0985792f2d08e77ed9a9110d2"],["/page/6/index.html","8ddea2d675e994ba4bf91ccc3b9f232f"],["/page/7/index.html","b80df834f04cd6c4cd1f2212b120ace7"],["/pimg/11328970,1920,1080-047b7a2de8.jpg","047b7a2de85607457c8e3e34d0b86948"],["/posts/2014-multi-university-training-contest-4/index.html","c81fbf88d116af9d21b3d17508329163"],["/posts/acm-international-collegiate-programming-contest-asia-regional-contest-tokyo-problem-d-space-golf/index.html","10b26f0ffecc5ff12101aceb97ee6a67"],["/posts/asp-net-mvc4-note1-simplemembership/index.html","3f70b87999071d00b2cfd9a05b2f7e27"],["/posts/asp-net-mvc4note2/index.html","d43f19fc356655ce8839c310d2dbc26f"],["/posts/basic-algorithms-in-go/index.html","c47591a370dace63acbf6f2a63393d62"],["/posts/baylor6622-absurdistan-roads/index.html","029ae080f79a6dbf9e7e0a89bf2c8420"],["/posts/beautifull-i3/index.html","c1036d6bf1651f6ad7b3617111a2c3e7"],["/posts/centos11-3/index.html","8b0ec94b7a076daa6cdabe692e4f7db3"],["/posts/centos21-4/index.html","1fabe4a20a13bc2898bcb801afc348ec"],["/posts/dom-compatibility-note/index.html","b22ce738e4e4acc4949604844f730c96"],["/posts/fft-thoughts/index.html","32e32fc15938fd1a93b976fb4e00ba05"],["/posts/graphql-learn-1---queries-and-mutations/index.html","73eb09528686cd2258b3ebd82a8a8342"],["/posts/graphql-learn-2---schemas-and-types/index.html","b2f7c877341f74a1fffebad1b819a74a"],["/posts/graphql-learn-3---validation/index.html","4d5e0912f84c4340eb67fd14991258ac"],["/posts/graphql-learn-4---execution/index.html","14c256c2919b7adc1174d874a716ca6d"],["/posts/graphql-learn-5---introspection/index.html","dd3af1fe6a3532a825a3270b6fd456d7"],["/posts/hdu-2874-connections-between-cities/index.html","c6e85c0519a6e62564f7280c19ab45d5"],["/posts/hdu-4945-2048/index.html","81ada1bd0e76d8e54412a0571ebfbe54"],["/posts/hdu-4952-number-transformation/index.html","a7248c480fab91ca56db7372d9f25e6a"],["/posts/hdu-4965-fast-matrix-calculation/index.html","ca05875782bc4e48054c15774774d248"],["/posts/hdu4005-the-war/index.html","bcd131e94ff74e674aa75559a15055ec"],["/posts/hdu4612-warm-up/index.html","350d766ccf58524c246c3b0089f22713"],["/posts/hdu4888-redraw-beautiful-drawings/index.html","87cba38a5e691fab5aacbf0dc4e30f9b"],["/posts/hdu4944-fsfs-game/index.html","8f2a4c6e5c42b09218c7cf3ffb52ca84"],["/posts/herbustluftwm-config/index.html","738de89f1a68aca70918fdce0f46680f"],["/posts/hexo-lightum-enhance/index.html","f76581086c88f31c1c7bf4e0f7a0e6ab"],["/posts/hexo-speedup-instantclick/index.html","ec7010ad45a9060f5d13e9d1e9ba460d"],["/posts/hugo-guidance/index.html","7537b41e1d2ec01df3a8a6c4269a4873"],["/posts/index.html","4971b03e0fdc52a182dadf93d5db7bbf"],["/posts/intro-of-fft/index.html","ebdb4914925f019faf48e0bdb4bcc2a0"],["/posts/kde-to-mac/index.html","46170070e97485990d51ad2d8cadeb76"],["/posts/kde4-config/index.html","259b64ea5b08b41ffd0123df1d5c9a8a"],["/posts/kubernetes--deepin-settings1-12/index.html","39211d4368e4887f77c8f609a6931c30"],["/posts/kubernetes部署1-5/index.html","420cf33fb8be41d1cc67cf0d16d15c2e"],["/posts/man-man-de/index.html","da75ca03792782e9220ff8a19585d2eb"],["/posts/netease-music-api/index.html","21c1b8d5370ecd33db1e9e69ce8d1f18"],["/posts/neutron-code/index.html","6d717efc8fcf4e908b71c06c5683d029"],["/posts/online-exam-of-netease-game/index.html","6be751165f3428acfe63a5a1d3927ab2"],["/posts/page/1/index.html","1957f9450adad92a919e3038fed9c665"],["/posts/page/2/index.html","aa74082662aada8a08cc45dfa6715ae9"],["/posts/page/3/index.html","039530524aa28f2720078f9e7b06c670"],["/posts/page/4/index.html","e4f366ae22576fdd90830a6441eca986"],["/posts/page/5/index.html","c4ab5ea032cc4b67f0c30d1b79b86721"],["/posts/page/6/index.html","3176fb1e294b35251a73e64a7776ea8c"],["/posts/page/7/index.html","09d3530005df0978a2a8ad580a5f59ef"],["/posts/pandorabox-transparent-proxy/index.html","d85d3552ff97dec2acd60598a703eb30"],["/posts/poj1330-nearest-common-ancestors/index.html","f1f0f12094a8e8c585c3f0ef451fd710"],["/posts/poj1989-distance-queries/index.html","bb4df21e9ca47d6a0e6386f81f7fe0b1"],["/posts/polymer-2-1-custom-elements/index.html","9fccef5f82ec70a051282d5259711b64"],["/posts/polymer-2-2-shadowdom/index.html","ef20c0db7cd934f54ece1ad591a5b8c1"],["/posts/polymer-2-3-events/index.html","d8f8605216e9f5f81bcc49af5e5e48c9"],["/posts/polymer-2-4-data-system/index.html","6a975dafd0c75f619da355a240689b42"],["/posts/polymer-2-5-observers-and-computed-properties/index.html","10df635983514fce305b3ecd435a05fc"],["/posts/polymer-2-6-data-binding/index.html","0b626770519aaed03c28d6750f4b5452"],["/posts/polymer-2-7-helper-element/index.html","4aeeb64b5e68d5a92c7eebdf3c87aace"],["/posts/pygobject-tutorial-1/index.html","9c64c60ffd097e297b6d04d6b06894c0"],["/posts/shadowsocks-account/index.html","3c4e2b2cbbba463efe160b26acc2f0c4"],["/posts/sublime-config-web/index.html","8e7fb5f9810e154e014ce16b82dda713"],["/posts/timus-1996-cipher-message-3-kmpfft/index.html","bcf9a50d0339410cd6fe59295c13880e"],["/posts/toutiao-test/index.html","6ab997d81cfe6d26ac41e6ebfd092f87"],["/posts/wine-font-config/index.html","5893fb8a61ea204f4aa6ecc34b030733"],["/posts/xfce4-config/index.html","b7d97aee292781cbb42b66e709610f02"],["/posts/xiaomi-openwrt--git/index.html","96a36268dee8f050acd90174e607d267"],["/posts/zjnu2073-geasscode/index.html","4a378f604f1e24fe189c35684603ac61"],["/posts/zjnu2082/index.html","3f7cefc09db3388a5786943b9b48f4b1"],["/posts/zjnu2085/index.html","ed373259b3b79235aec7eb6e7aaf75ec"],["/posts/zju-openwrt-settings/index.html","46a74d623e7efca83bb55e0d6f5c21cb"],["/posts/zoj-month-contest-d-determinant-and-matrix/index.html","0f45b863858af623b0707c551f041b63"],["/posts/斐波那契堆之go实现/index.html","1b8141ca7cd97d18885e2c07ac2282be"],["/svg/icon.svg","f534fdc4b27570991ebe3dbc89ea15e0"],["/tags/algorithm/index.html","54ba4c52ebf84a37bd026c2a120ca444"],["/tags/algorithm/page/1/index.html","ab88f7f408ead5a0283d4ba3db1af27d"],["/tags/api/index.html","023a3f49fa0c1406939d4a9d1576a0e4"],["/tags/api/page/1/index.html","d65d65a531a50b923221a80160e3c90d"],["/tags/asp.net-mvc4/index.html","0ad9a83028173393a569238935419159"],["/tags/asp.net-mvc4/page/1/index.html","d89d7f7953a4e5b9d89b452f42d5d26d"],["/tags/blog-generator/index.html","e5224ef7fa0027eca7585adba7916c78"],["/tags/blog-generator/page/1/index.html","0f3404a1f71e92d862dc89ef7d0f2d17"],["/tags/centos/index.html","c48197ca3f0cc4bd1ea7d05ba761cbe3"],["/tags/centos/page/1/index.html","924445b8652a9288710b3df971047ff3"],["/tags/chinadns/index.html","6fb2518cbf7a36a3b8e748bea546e64f"],["/tags/chinadns/page/1/index.html","bac4af9512bfea0721de0b0b02697b98"],["/tags/de-wm/index.html","f74cf966db92ea8074fd346e84a0b43a"],["/tags/de-wm/page/1/index.html","4fc53e555c6a51079c45c86bedbf4cf9"],["/tags/deepin/index.html","7f64a562382e0fadf063e4b9f0613cf3"],["/tags/deepin/page/1/index.html","626d94d21df7babadf11b3ba0fc18154"],["/tags/docker/index.html","4ed7f6d7cc15e5729653140ce31f47ec"],["/tags/docker/page/1/index.html","1ae01f6cdb99c82aa287c7feb184be11"],["/tags/dom/index.html","8c26664ff930c1fa44b317398dad506f"],["/tags/dom/page/1/index.html","7df07348531de132b9154cdd1f5ea3e5"],["/tags/dp/index.html","c8e10e319f1d9ab0d2161f27c0fb25c9"],["/tags/dp/page/1/index.html","6ee44301b21b4f378b3ce2d860d9e37d"],["/tags/encryption/index.html","4c5cedd64a2b3fa28c7b529601613011"],["/tags/encryption/page/1/index.html","65ecea9311b1d38ca1dbf378ecaf5a47"],["/tags/git/index.html","fd0a99467e95e47d25754a4599c8ea0a"],["/tags/git/page/1/index.html","2f74b2d08bcba0989c9dc6c0493d0f28"],["/tags/gnome/index.html","6db4aefaf774fd8622e5a6c47ba0598d"],["/tags/gnome/page/1/index.html","6f0720332fc4a9de89cbdb39ad511785"],["/tags/go/index.html","95b16ca702f7652224fbd1ddf7126747"],["/tags/go/page/1/index.html","8afec30c210db7dcafbf3b2b054556d5"],["/tags/golang/index.html","c4cd34f792e5ccd6cc8b18eed6a98d34"],["/tags/golang/page/1/index.html","ef1c78a42fcb0af21cdcdb573fea789c"],["/tags/graphql/index.html","1e0222fc17cee9fcc517f365ac8a0208"],["/tags/graphql/page/1/index.html","1b52939d0df596467dc7b6fe67e71f10"],["/tags/gtk/index.html","e1bf167cc64e70682f6f469c1c55e893"],["/tags/gtk/page/1/index.html","aea599fa7d2950ed80aae2a9bd09d98b"],["/tags/html/index.html","1d3831cffb49c005c1def5d5ff9be590"],["/tags/html/page/1/index.html","b78bc96d62a656d5a20c31a30233132e"],["/tags/hugo/index.html","c5cf373f44133c18f06bcbf04ca79f2b"],["/tags/hugo/page/1/index.html","c95fae225f4b31471da6d099e0cf432d"],["/tags/i3wm/index.html","91ab11fb385bbd81b7e863e47da4ed4a"],["/tags/i3wm/page/1/index.html","87ca0df601452b34eb517a500376e5c1"],["/tags/index.html","b49b23a82a35423c752116784b7db032"],["/tags/infinality-fonts/index.html","5dabe9046680ea620e2987deadfbad20"],["/tags/infinality-fonts/page/1/index.html","6633ff4993734da6bb1bac722590621e"],["/tags/instantclick/index.html","3b5aa048159afbf0a56c261de713a79a"],["/tags/instantclick/page/1/index.html","35c4ca73ec78ca8b69724fb0fd7327a0"],["/tags/ipv6/index.html","205b9c54fe8e546c18cf5be927170fb5"],["/tags/ipv6/page/1/index.html","c227f5f70be79a0aa3961ae06cd5eb9f"],["/tags/javascirpt/index.html","8a9e768baae80043a5676c3ddeb6285b"],["/tags/javascirpt/page/1/index.html","c3af7c1307ef63abf4091a04769374b0"],["/tags/kubernetes/index.html","6d63c421da7526638ce7e325bf856daf"],["/tags/kubernetes/page/1/index.html","708d7edf4d4b34d36745c592068a8964"],["/tags/lca/index.html","2c61beb61619dd2c104015920d544347"],["/tags/lca/page/1/index.html","5c5f6407072c37d165280e7504874608"],["/tags/lcs/index.html","4980d1676ae793ebcc1a8b8ce8c10e60"],["/tags/lcs/page/1/index.html","4f9dd246d825c36705e48b5b09ee4e8e"],["/tags/linux/index.html","6550062ef30bf8fa5eefd14d62aa4da9"],["/tags/linux/page/1/index.html","951ce0693980ebce4e09859e890f7136"],["/tags/meow/index.html","7a03aee7083d3bd9807d9a2bef049095"],["/tags/meow/page/1/index.html","03b0883ac3ead4cd3bc66bef18fa1bd9"],["/tags/neutron/index.html","77005101ed71bc92e40ba3182447879d"],["/tags/neutron/page/1/index.html","e16f4d4594aaeac065e585df7c263d61"],["/tags/octotree/index.html","d4041cd5588366adb3181c101b9f680a"],["/tags/octotree/page/1/index.html","a9232316ac657cd918ef1a9b141a0c5b"],["/tags/openstack/index.html","ae72ef9c5c44ec1ff1ce7d76802d0321"],["/tags/openstack/page/1/index.html","ae0c16fbb66f6a3551cf36d506a132fb"],["/tags/openwrt/index.html","e95af690b8a16ad4a0dabbad7ce34c7c"],["/tags/openwrt/page/1/index.html","e0d5a33b52f5c2bc9f6f47f5f560b43d"],["/tags/polymer/index.html","90058287ecdbc767f0f4a722bff3bb68"],["/tags/polymer/page/1/index.html","a4c5d453b278eca9c659a976aa9759ba"],["/tags/ppa/index.html","d6979aed3dcd142126ce0d81a63102ab"],["/tags/ppa/page/1/index.html","488681a3e2458d27c1480970fd5ebdaa"],["/tags/prezto/index.html","82a24c484171c9cc2b17c6ffad405459"],["/tags/prezto/page/1/index.html","1b072ab49c94f359ee5bb769aea09e70"],["/tags/pt/index.html","eb23afe14e3a38cb74b0cc6a5fab9e67"],["/tags/pt/page/1/index.html","c878bab4e9a73a89beded36bfdf3e1d4"],["/tags/python/index.html","8b693e1627a545f8868c35452365b653"],["/tags/python/page/1/index.html","30b7643796cdef65e35ae44d864fa37d"],["/tags/rmq/index.html","73018c22f1b8639add88312d8e2cfef0"],["/tags/rmq/page/1/index.html","74cf4c40b81fed4f49dc9a4a7c917a7d"],["/tags/shadowsocks/index.html","ea08b00b943e5a2e408ff0d2bdec7ace"],["/tags/shadowsocks/page/1/index.html","20f32f46a5f66630102883a7e9e7999f"],["/tags/simplemembership/index.html","9bc5c280a56be36997638a6fed1b69bc"],["/tags/simplemembership/page/1/index.html","98d6dedad92213dc92f781cf5867ada7"],["/tags/sublime-text/index.html","a4b2808264e8484fc2b8be6ec6b91cce"],["/tags/sublime-text/page/1/index.html","2e5ce5662818860fcd0d205c553f9716"],["/tags/tarjan/index.html","b1cabf1ca4d50937e106e44bdfeeaccb"],["/tags/tarjan/page/1/index.html","2697fd215e8bc6a5ea6c8b2d67144dba"],["/tags/tmux/index.html","6f9fbec1ce8f638b0dfe19b0ed6e2451"],["/tags/tmux/page/1/index.html","8042bf1df1ef5191e52cdc7518dbbab0"],["/tags/xfce4/index.html","c76aa4a7a73adf8f114f0e8f5114e9ac"],["/tags/xfce4/page/1/index.html","d72583de6439bbb0a0c54786b972a85d"],["/tags/倍增/index.html","5de2eed21835f826fea1d6569617cb0b"],["/tags/倍增/page/1/index.html","22cdfdfd2d7aa0e1f9aa1c7569fe0e5b"],["/tags/只言片语/index.html","182543668ffd662b7bea365f4958c698"],["/tags/只言片语/page/1/index.html","32fa4fa7b103a228c171e432d7fc8b94"],["/tags/图论/index.html","f14bfae048f131b09cf9079e7330cac9"],["/tags/图论/page/1/index.html","63c35ebb23dc3dd9e42553a5e3bfc55c"],["/tags/招聘/index.html","b252fe347700c679ce665276e3dfaddc"],["/tags/招聘/page/1/index.html","5ba945f919fd776eee10769a57787514"],["/tags/数论/index.html","54d41486d627fc97be3ea8bbf3ca2e1b"],["/tags/数论/page/1/index.html","b8601cf4fa88aeb29a3f9270c0b386ce"],["/tags/暴力/index.html","71380d1fbba7cacb20adaaaecc4826a1"],["/tags/暴力/page/1/index.html","19416d7ff45fb13cb2f67afb49c5e29f"],["/tags/树形dp/index.html","16d41f48b5634a9f9b349285caf6aa71"],["/tags/树形dp/page/1/index.html","1189e14cac8ce6106423ffe2569a2b91"],["/tags/树的直径/index.html","c297974f73478fe649513b3865553494"],["/tags/树的直径/page/1/index.html","67410b713b58971586ac7c4f3b45f9f9"],["/tags/矩阵/index.html","3769c36003267facafd831a9b2a23ab2"],["/tags/矩阵/page/1/index.html","e7a1cd9b71c7145cdc9a254f24db5575"],["/tags/科学上网/index.html","32c7fbd3525c244503a8abff52c5261f"],["/tags/科学上网/page/1/index.html","117655b06c41cdbba671e70c6588c842"],["/tags/组合/index.html","504ba8593083030eb172234087e878c8"],["/tags/组合/page/1/index.html","ec7e914c6384e2d6e54780ff74df3456"],["/tags/网易/index.html","8b791bd4c7f8b1c4ba65ae3e97da8d33"],["/tags/网易/page/1/index.html","654f206d190d32f1102b5d1d6b7c675e"],["/tags/网易云音乐/index.html","bc1ec4e952383016d5324d9546726ea5"],["/tags/网易云音乐/page/1/index.html","a394d1aba6c937089f890ed77df52e18"],["/tags/网络流/index.html","896041d433a0b0b0a47f9ac6a7060baf"],["/tags/网络流/page/1/index.html","ec8b28c71ff004fbb348a5be8ed7ecc2"],["/tags/美化/index.html","b702a9dc9f5a71919153285d3923b6cd"],["/tags/美化/page/1/index.html","4f18ed2eac7efdebf767d0c3c2b8ca95"],["/tags/路由器/index.html","abc579642085bb65d5a2f090606c4993"],["/tags/路由器/page/1/index.html","f10cdfbf3118bd1b06e4e83b44804c8e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.bootcss.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.cat.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"gstatic.cat.net"});




