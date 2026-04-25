{{/*
Expand the chart name.
*/}}
{{- define "dashboard-dev.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{/*
Generate a full name for the release.
*/}}
{{- define "dashboard-dev.fullname" -}}
{{ printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end -}}

