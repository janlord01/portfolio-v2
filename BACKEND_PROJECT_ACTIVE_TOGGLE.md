# Backend Project Active/Inactive Toggle API Implementation

## Overview
The frontend now has a toggle button to activate/deactivate projects. This requires backend API endpoint and database migration to support the `is_active` field.

## Database Migration

### Migration: Add `is_active` column to projects table

**Migration File:** `YYYY_MM_DD_HHMMSS_add_is_active_to_projects_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
```

**Notes:**
- Add the `is_active` column as a boolean type
- Default value should be `true` (all existing projects will be active by default)
- Position it after the `order` column (or wherever appropriate in your schema)

---

## Required API Endpoint

### POST `/api/projects/{id}/toggle-active`
**Purpose:** Toggle the active/inactive status of a project

**Request:**
- Method: POST
- URL: `/api/projects/{id}/toggle-active`
- Headers:
  - `Authorization: Bearer {token}` (if authentication required)
  - `Content-Type: application/json`
- Body (JSON):
```json
{
  "is_active": true
}
```

**Response (Success):**
```json
{
  "status": 200,
  "message": "Project activated successfully",
  "data": {
    "id": 1,
    "name": "Project Name",
    "is_active": true,
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error - Project Not Found):**
```json
{
  "status": 404,
  "message": "Project not found"
}
```

**Response (Error - Validation):**
```json
{
  "status": 400,
  "message": "Validation error message"
}
```

---

## Implementation Details

### Validation Rules
1. `is_active` field is required and must be a boolean value
2. Project with the given `id` must exist
3. User must be authenticated (if authentication is required)

### Business Logic
- When `is_active` is `true`, the project should be visible/active
- When `is_active` is `false`, the project should be hidden/inactive
- The toggle should update the `is_active` field in the database
- Update the `updated_at` timestamp

### Model Updates
If using Laravel, update your Project model to include the `is_active` field in the `$fillable` array:

```php
protected $fillable = [
    'name',
    'sub_caption',
    'url',
    'github_url',
    'caption',
    'icon',
    'image',
    'tech',
    'type',
    'order',
    'is_active', // Add this
];
```

### Controller Method Example (Laravel)
```php
public function toggleActive(Request $request, $id)
{
    $request->validate([
        'is_active' => 'required|boolean'
    ]);

    $project = Project::findOrFail($id);
    $project->is_active = $request->is_active;
    $project->save();

    return response()->json([
        'status' => 200,
        'message' => $request->is_active ? 'Project activated successfully' : 'Project deactivated successfully',
        'data' => $project
    ], 200);
}
```

### Route Definition (Laravel)
```php
Route::post('/projects/{id}/toggle-active', [ProjectController::class, 'toggleActive'])
    ->middleware('auth:sanctum'); // Adjust middleware as needed
```

---

## Frontend Integration Notes

The frontend expects:
- The API endpoint to accept POST requests with `is_active` boolean in the request body
- Response with `status: 200` and a `message` field for success notifications
- The response `data` should include the updated project with `is_active` field
- On error, return appropriate status codes (400, 404, 500) with error messages

---

## Testing Checklist
- [ ] Migration runs successfully and adds `is_active` column
- [ ] Existing projects default to `is_active = true`
- [ ] POST endpoint activates project when `is_active: true`
- [ ] POST endpoint deactivates project when `is_active: false`
- [ ] Validation errors are returned for invalid input
- [ ] 404 error returned for non-existent projects
- [ ] Authorization/authentication is properly enforced (if applicable)
- [ ] `updated_at` timestamp is updated on toggle
- [ ] Frontend toggle reflects the correct state after API call

---

## Example Request/Response

### Activate Project
**Request:**
```
POST /api/projects/1/toggle-active
Content-Type: application/json
Authorization: Bearer {token}

{
  "is_active": true
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Project activated successfully",
  "data": {
    "id": 1,
    "name": "My Portfolio Website",
    "is_active": true,
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### Deactivate Project
**Request:**
```
POST /api/projects/1/toggle-active
Content-Type: application/json
Authorization: Bearer {token}

{
  "is_active": false
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Project deactivated successfully",
  "data": {
    "id": 1,
    "name": "My Portfolio Website",
    "is_active": false,
    "updated_at": "2024-01-15T10:35:00Z"
  }
}
```

---

## Additional Considerations

### Public API Filtering
If you have a public API endpoint that returns projects (e.g., for the portfolio homepage), you may want to filter out inactive projects:

```php
// In your controller
public function index()
{
    $projects = Project::where('is_active', true)
        ->orderBy('order')
        ->get();

    return response()->json([
        'status' => 200,
        'projects' => $projects
    ]);
}
```

This ensures that inactive projects are not displayed on the public-facing portfolio page.

