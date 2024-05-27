# Dispatch
<img align="right" width="70" height="70" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Deputy_Dispatch_logo.svg" alt="Deputy Dispatch logo">

Dispatch is a Node.js+Express webserver that exposes API endpoints that processes
large masses of data from Wikimedia wikis for easier consumption by
[Deputy](https://github.com/ChlodAlejandro/deputy). It is meant to centralize
and optimize the gathering and processing of bulk data such that numerous
users of Deputy do not individual make taxing requests on Wikimedia servers.

This folder contains types used by both Deputy and Dispatch. They are located in
a separate repository to aid development. Making changes to this repository should
be in the context of either repository.

## Licensing

```
Copyright 2022 Chlod Aidan Alejandro

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
