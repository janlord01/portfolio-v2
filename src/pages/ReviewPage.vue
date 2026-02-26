<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-md">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <div class="text-h6">Reviews</div>
          <div class="text-caption text-grey-7">
            All reviews (pending and approved) — manage and approve here.
          </div>
        </div>
        <q-btn
          label="Add review"
          color="primary"
          outline
          icon="add"
          @click="openEditDialog()"
        />
      </div>

      <div v-if="loading" class="row justify-center q-pa-lg">
        <q-spinner-dots color="primary" size="40px" />
      </div>

      <div v-else-if="reviews.length === 0" class="q-pa-lg text-center text-grey-7">
        <p>No reviews yet.</p>
        <q-btn flat color="primary" label="Retry" icon="refresh" @click="fetchReviews" />
      </div>

      <div v-else class="reviews-table-wrapper" key="reviews-table">
        <q-table
          flat
          bordered
          :rows="tableRows"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[10, 25]"
          dense
          class="reviews-table"
          style="table-layout: fixed"
        >
          <template v-slot:body-cell-message="props">
            <q-td :props="props" class="message-cell">
              <span class="text-ellipsis-2">{{ props.row.message }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-rating="props">
            <q-td :props="props">
              <q-icon
                v-for="n in 5"
                :key="n"
                :name="n <= props.row.rating ? 'star' : 'star_border'"
                size="sm"
                :color="n <= props.row.rating ? 'amber' : 'grey'"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="props.row.status === 'approved' ? 'positive' : 'grey'"
                size="sm"
                text-color="white"
              >
                {{ props.row.status }}
              </q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="actions-cell">
              <q-btn
                flat
                dense
                size="sm"
                icon="mdi-pencil"
                color="primary"
                @click="openEditDialog(props.row)"
              />
              <q-btn
                flat
                dense
                size="sm"
                :icon="
                  props.row.status === 'approved'
                    ? 'mdi-eye-off'
                    : 'mdi-eye-check'
                "
                :label="
                  props.row.status === 'approved' ? 'Set pending' : 'Approve'
                "
                color="primary"
                @click="toggleStatus(props.row.id)"
              />
              <q-btn
                flat
                dense
                size="sm"
                icon="mdi-delete"
                color="negative"
                @click="confirmDelete(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card>

    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6">
            {{ editingId ? "Edit review" : "Add review" }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="saveReview" class="q-gutter-md">
            <q-input
              v-model="form.client_name"
              label="Client name *"
              outlined
              dense
              :rules="[(v) => !!v || 'Required']"
            />
            <q-input
              v-model="form.business_email"
              label="Business email *"
              type="email"
              outlined
              dense
              :rules="[(v) => !!v || 'Required']"
            />
            <q-input
              v-model="form.client_title"
              label="Client title (optional)"
              outlined
              dense
            />
            <q-input
              v-model="form.client_linkedin_url"
              label="LinkedIn URL (optional)"
              outlined
              dense
            />
            <q-input
              v-model="form.message"
              label="Message *"
              type="textarea"
              outlined
              dense
              rows="3"
              :rules="[(v) => !!v || 'Required']"
            />
            <div>
              <span class="text-caption q-mr-sm">Rating *</span>
              <q-rating
                v-model="form.rating"
                :max="5"
                size="1.5em"
                color="amber"
                icon="star_border"
                icon-selected="star"
              />
            </div>
            <q-select
              v-model="form.status"
              :options="['pending', 'approved']"
              label="Status"
              outlined
              dense
            />
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                type="submit"
                label="Save"
                color="primary"
                :loading="saving"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();
const loading = ref(false);
const saving = ref(false);
const reviews = ref([]);
const tableRows = computed(() => Array.isArray(reviews.value) ? reviews.value : []);
const editDialog = ref(false);
const editingId = ref(null);
const form = ref({
  client_name: "",
  business_email: "",
  client_title: "",
  client_linkedin_url: "",
  message: "",
  rating: 3,
  status: "pending",
});

const columns = [
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "left",
    sortable: true,
    style: "width: 60px",
  },
  { name: "client_name", label: "Name", field: "client_name", align: "left" },
  {
    name: "client_title",
    label: "Title",
    field: "client_title",
    align: "left",
  },
  {
    name: "rating",
    label: "Rating",
    field: "rating",
    align: "left",
    style: "width: 100px",
  },
  {
    name: "message",
    label: "Message",
    field: "message",
    align: "left",
    style: "max-width: 280px",
  },
  { name: "status", label: "Status", field: "status", align: "left" },
  { name: "actions", label: "Actions", align: "left" },
];

function normalizeReviewsList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.reviews)) return data.reviews;
  return [];
}

async function fetchReviews() {
  loading.value = true;
  reviews.value = [];
  try {
    const res = await api.get("/api/reviews", {
      headers: { Accept: "application/json" },
    });
    const list = normalizeReviewsList(res.data);
    reviews.value = list;
  } catch (e) {
    const msg =
      e.response?.status === 401
        ? "Please log in to the dashboard to manage reviews."
        : e.response?.data?.message || "Failed to load reviews.";
    $q.notify({ type: "negative", message: msg });
    reviews.value = [];
  } finally {
    loading.value = false;
  }
}

function openEditDialog(row = null) {
  editingId.value = row ? row.id : null;
  form.value = {
    client_name: row?.client_name ?? "",
    business_email: row?.business_email ?? "",
    client_title: row?.client_title ?? "",
    client_linkedin_url: row?.client_linkedin_url ?? "",
    message: row?.message ?? "",
    rating: row?.rating ?? 3,
    status: row?.status ?? "approved",
  };
  editDialog.value = true;
}

async function saveReview() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.post(`/api/reviews/${editingId.value}/update`, form.value);
      $q.notify({ type: "positive", message: "Review updated." });
    } else {
      await api.post("/api/reviews", form.value);
      $q.notify({ type: "positive", message: "Review created." });
    }
    editDialog.value = false;
    await fetchReviews();
  } catch (e) {
    $q.notify({
      type: "negative",
      message: e.response?.data?.message || "Failed to save.",
    });
  } finally {
    saving.value = false;
  }
}

async function toggleStatus(id) {
  try {
    await api.post(`/api/reviews/${id}/toggle-status`);
    $q.notify({ type: "positive", message: "Status updated." });
    await fetchReviews();
  } catch (e) {
    $q.notify({
      type: "negative",
      message: e.response?.data?.message || "Failed to update status.",
    });
  }
}

function confirmDelete(id) {
  $q.dialog({
    title: "Delete review",
    message: "Are you sure you want to delete this review?",
    ok: { label: "Delete", color: "negative" },
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await api.delete(`/api/reviews/${id}`);
      $q.notify({ type: "positive", message: "Review deleted." });
      await fetchReviews();
    } catch (e) {
      $q.notify({
        type: "negative",
        message: e.response?.data?.message || "Failed to delete.",
      });
    }
  });
}

onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
.reviews-table-wrapper {
  overflow-x: auto;
  width: 100%;
}

.reviews-table :deep(table) {
  min-width: 800px;
}

.reviews-table :deep(.message-cell) {
  max-width: 280px;
  overflow: hidden;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.reviews-table :deep(.actions-cell) {
  white-space: nowrap;
}
</style>
