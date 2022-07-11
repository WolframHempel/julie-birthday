#!/bin/bash
webpack
gsutil -m cp -r dist/* gs://pb-internal/internal/
gsutil -m cp -r index.html gs://pb-internal/internal/
gcloud compute url-maps invalidate-cdn-cache pb-lb --path "/internal/*" --project podbabble
echo "deployed! :-)"