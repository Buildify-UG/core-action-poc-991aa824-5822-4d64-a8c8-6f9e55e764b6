import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Heart, Users, Zap } from 'lucide-react';

interface Item {
  id: string;
  title: string;
  description: string;
  category: 'task' | 'project' | 'idea';
  owner: string | null;
  claimedAt: Date | null;
}

const Index = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page for the product',
      category: 'task',
      owner: null,
      claimedAt: null,
    },
    {
      id: '2',
      title: 'Mobile app prototype',
      description: 'Build a working prototype of the iOS app',
      category: 'project',
      owner: null,
      claimedAt: null,
    },
    {
      id: '3',
      title: 'AI-powered recommendations',
      description: 'Implement machine learning for personalized suggestions',
      category: 'idea',
      owner: null,
      claimedAt: null,
    },
    {
      id: '4',
      title: 'Fix payment integration bug',
      description: 'Resolve the Stripe webhook timeout issue',
      category: 'task',
      owner: 'Sarah Chen',
      claimedAt: new Date('2026-09-08'),
    },
    {
      id: '5',
      title: 'Analytics dashboard',
      description: 'Build real-time analytics and reporting interface',
      category: 'project',
      owner: 'Marcus Rodriguez',
      claimedAt: new Date('2026-09-07'),
    },
  ]);

  const handleClaimOwnership = (id: string) => {
    setItems(items.map(item =>
      item.id === id && !item.owner
        ? { ...item, owner: 'You', claimedAt: new Date() }
        : item
    ));
  };

  const handleRelease = (id: string) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, owner: null, claimedAt: null }
        : item
    ));
  };

  const unclaimedItems = items.filter(item => !item.owner);
  const claimedItems = items.filter(item => item.owner);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'idea': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Somebody Own</h1>
          </div>
          <p className="text-lg text-gray-600">Claim ownership of tasks, projects, and ideas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Card className="bg-white p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{items.length}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </Card>
          <Card className="bg-white p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Claimed</p>
                <p className="text-3xl font-bold text-gray-900">{claimedItems.length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-200" />
            </div>
          </Card>
          <Card className="bg-white p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available</p>
                <p className="text-3xl font-bold text-gray-900">{unclaimedItems.length}</p>
              </div>
              <Heart className="w-10 h-10 text-red-200" />
            </div>
          </Card>
        </div>

        {/* Available Items */}
        {unclaimedItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available to Claim</h2>
            <div className="grid gap-4">
              {unclaimedItems.map(item => (
                <Card key={item.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                    <Button
                      onClick={() => handleClaimOwnership(item.id)}
                      className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium whitespace-nowrap"
                    >
                      Claim Ownership
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Claimed Items */}
        {claimedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Owned Items</h2>
            <div className="grid gap-4">
              {claimedItems.map(item => (
                <Card key={item.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-gray-500">Owner: </span>
                          <span className="font-semibold text-gray-900">{item.owner}</span>
                        </div>
                        {item.claimedAt && (
                          <div>
                            <span className="text-gray-500">Claimed: </span>
                            <span className="font-semibold text-gray-900">
                              {item.claimedAt.toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.owner === 'You' && (
                      <Button
                        onClick={() => handleRelease(item.id)}
                        variant="outline"
                        className="ml-4 text-gray-600 hover:text-gray-900 whitespace-nowrap"
                      >
                        Release
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* What's Next Section */}
      <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's next?</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• User authentication and accounts</li>
          <li>• Real-time ownership notifications</li>
          <li>• Comments and discussion threads on items</li>
          <li>• Progress tracking and completion status</li>
          <li>• Team collaboration and shared ownership</li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
