---
layout: default
title: Hlavní stránka
---

# Obsah

{% assign files = site.static_files | where_exp: "item", "item.path contains 'submodul/'" %}
{% for file in files %}
  {% if file.extname == ".md" %}
  - [{{ file.basename | capitalize }}]({{ file.path }})
  {% endif %}
{% endfor %}
