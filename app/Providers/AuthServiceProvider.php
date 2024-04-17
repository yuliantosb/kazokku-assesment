<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('view-user', function (User $user) {
            return $user->type === 'admin';
        });
        Gate::define('update-user', function (User $user) {
            return $user->type === 'admin';
        });
        Gate::define('get-user', function (User $user) {
            return $user->type === 'admin';
        });
        Gate::define('store-user', function (User $user) {
            return $user->type === 'admin';
        });
        Gate::define('delete-user', function (User $user) {
            return $user->type === 'admin';
        });
    }
}
